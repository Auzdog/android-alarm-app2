package com.example.alarmapp

import android.animation.ValueAnimator
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.alarmapp.databinding.ItemAlarmBinding
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class AlarmAdapter(
    private val onDelete: (Long) -> Unit,
    private val onToggle: (Long, Boolean) -> Unit,
    private val onTimeClick: (Long, Int, Int) -> Unit
) : ListAdapter<Alarm, AlarmAdapter.AlarmViewHolder>(AlarmDiffCallback()) {

    private var expandedPosition = RecyclerView.NO_POSITION
    private val expandedHeights = mutableMapOf<Int, Int>() // Track heights by position

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlarmViewHolder {
        val binding = ItemAlarmBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return AlarmViewHolder(
            binding = binding,
            onDelete = onDelete,
            onToggle = onToggle,
            onTimeClick = onTimeClick,
            onExpand = { position -> handleExpansion(position) },
            getExpandedHeight = { pos -> expandedHeights[pos] },
            setExpandedHeight = { pos, height -> expandedHeights[pos] = height },
            clearExpandedHeight = { pos -> expandedHeights.remove(pos) }
        )
    }

    private fun handleExpansion(newPosition: Int) {
        val oldPosition = expandedPosition
        
        // Handle collapse case
        if (oldPosition == newPosition) {
            expandedPosition = RecyclerView.NO_POSITION
            notifyItemChanged(oldPosition)
            return
        }

        // Handle expansion case
        if (oldPosition != RecyclerView.NO_POSITION) {
            // First collapse the old item
            expandedPosition = RecyclerView.NO_POSITION
            notifyItemChanged(oldPosition)
        }
        
        // Then expand the new item
        expandedPosition = newPosition
        notifyItemChanged(newPosition)
    }

    override fun onBindViewHolder(holder: AlarmViewHolder, position: Int) {
        holder.bind(getItem(position), position == expandedPosition)
    }

    override fun onBindViewHolder(
        holder: AlarmViewHolder,
        position: Int,
        payloads: MutableList<Any>
    ) {
        if (payloads.isEmpty()) {
            super.onBindViewHolder(holder, position, payloads)
        } else {
            // Just update the expansion state without full rebind
            holder.bind(getItem(position), position == expandedPosition)
        }
    }

    class AlarmViewHolder(
        private val binding: ItemAlarmBinding,
        private val onDelete: (Long) -> Unit,
        private val onToggle: (Long, Boolean) -> Unit,
        private val onTimeClick: (Long, Int, Int) -> Unit,
        private val onExpand: (Int) -> Unit,
        private val getExpandedHeight: (Int) -> Int?,
        private val setExpandedHeight: (Int, Int) -> Unit,
        private val clearExpandedHeight: (Int) -> Unit
    ) : RecyclerView.ViewHolder(binding.root) {
        private val timeFormat = SimpleDateFormat("h:mm", Locale.getDefault())
        private val amPmFormat = SimpleDateFormat("a", Locale.getDefault())

        fun bind(alarm: Alarm, isExpanded: Boolean) {
            val calendar = Calendar.getInstance().apply {
                set(Calendar.HOUR_OF_DAY, alarm.hour)
                set(Calendar.MINUTE, alarm.minute)
            }

            // Set up the interactive elements (top layer)
            binding.timeText.text = "${timeFormat.format(calendar.time)} ${amPmFormat.format(calendar.time)}"
            binding.labelText.text = alarm.label

            // Time click handler
            binding.timeContainer.setOnClickListener {
                onTimeClick(alarm.id, alarm.hour, alarm.minute)
            }

            // Delete button handler
            binding.deleteButton.setOnClickListener {
                onDelete(alarm.id)
            }

            // Switch handler
            binding.alarmSwitch.setOnCheckedChangeListener(null)
            binding.alarmSwitch.isChecked = alarm.isEnabled
            binding.alarmSwitch.setOnCheckedChangeListener { _, isChecked ->
                onToggle(alarm.id, isChecked)
            }

            // Base container expansion handler (bottom layer)
            binding.baseContainer.setOnClickListener {
                onExpand(adapterPosition)
            }

            // Handle expansion with animation
            if (isExpanded) {
                expandView(binding.expandableContent, adapterPosition)
            } else {
                collapseView(binding.expandableContent, adapterPosition)
            }
        }

        private fun expandView(view: View, position: Int) {
            // First measure the view
            view.measure(
                View.MeasureSpec.makeMeasureSpec(view.width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
            )
            val targetHeight = view.measuredHeight
            setExpandedHeight(position, targetHeight)

            // Set initial state
            view.alpha = 0f
            view.visibility = View.VISIBLE
            view.layoutParams.height = 0

            // Ensure the view starts with 0 height before animation
            view.requestLayout()
            
            // Create and start animation
            ValueAnimator.ofInt(0, targetHeight).apply {
                duration = 150
                interpolator = android.view.animation.DecelerateInterpolator()
                
                addUpdateListener { animation ->
                    val value = animation.animatedValue as Int
                    view.layoutParams.height = value
                    view.alpha = animation.animatedFraction
                    
                    // Only request layout when height actually changes
                    if (view.layoutParams.height != value) {
                        view.requestLayout()
                    }
                }
                
                start()
            }
        }

        private fun collapseView(view: View, position: Int) {
            // Get the stored height or measure it
            val startHeight = getExpandedHeight(position) ?: run {
                view.measure(
                    View.MeasureSpec.makeMeasureSpec(view.width, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
                )
                view.measuredHeight
            }

            // Ensure proper starting state
            view.layoutParams.height = startHeight
            view.visibility = View.VISIBLE
            view.alpha = 1f

            // Ensure the view starts with full height before animation
            view.requestLayout()

            // Create and start animation for collapse
            ValueAnimator.ofInt(startHeight, 0).apply {
                duration = 150
                interpolator = android.view.animation.DecelerateInterpolator()
                
                addUpdateListener { animation ->
                    val value = animation.animatedValue as Int
                    view.layoutParams.height = value
                    view.alpha = 1 - animation.animatedFraction
                    
                    // Only request layout when height actually changes
                    if (view.layoutParams.height != value) {
                        view.requestLayout()
                    }
                }
                
                addListener(object : android.animation.AnimatorListenerAdapter() {
                    override fun onAnimationEnd(animation: android.animation.Animator) {
                        view.visibility = View.GONE
                        view.layoutParams.height = ViewGroup.LayoutParams.WRAP_CONTENT
                        clearExpandedHeight(position)
                    }
                })
                
                start()
            }
        }
    }

    private class AlarmDiffCallback : DiffUtil.ItemCallback<Alarm>() {
        override fun areItemsTheSame(oldItem: Alarm, newItem: Alarm): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Alarm, newItem: Alarm): Boolean {
            return oldItem == newItem
        }
    }

    companion object {
        private const val PAYLOAD_EXPANSION_CHANGE = "expansion_change"
    }
} 