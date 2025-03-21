package com.example.alarmapp

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.DefaultItemAnimator
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.alarmapp.databinding.FragmentAlarmBinding
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.TimeFormat

class AlarmFragment : Fragment() {
    private var _binding: FragmentAlarmBinding? = null
    private val binding get() = _binding!!
    private val viewModel: AlarmViewModel by activityViewModels()
    private lateinit var alarmAdapter: AlarmAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAlarmBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Initialize adapter
        alarmAdapter = AlarmAdapter(
            onDelete = { id -> viewModel.deleteAlarm(id) },
            onToggle = { id, isEnabled -> viewModel.toggleAlarm(id, isEnabled) },
            onTimeClick = { id, hour, minute -> viewModel.updateAlarmTime(id, hour, minute) }
        )

        // Set up RecyclerView with animations
        binding.alarmList.apply {
            layoutManager = LinearLayoutManager(requireContext())
            adapter = alarmAdapter
            setHasFixedSize(true)
            itemAnimator = DefaultItemAnimator().apply {
                supportsChangeAnimations = true
                changeDuration = 150
                moveDuration = 150
                addDuration = 150
                removeDuration = 150
            }
        }

        // Observe alarms
        viewModel.alarms.observe(viewLifecycleOwner) { alarms ->
            alarmAdapter.submitList(alarms)
        }
    }

    private fun showTimePicker(alarmId: Long, currentHour: Int, currentMinute: Int) {
        val picker = MaterialTimePicker.Builder()
            .setTimeFormat(TimeFormat.CLOCK_12H)
            .setHour(currentHour)
            .setMinute(currentMinute)
            .setTitleText("Edit Alarm Time")
            .build()

        picker.addOnPositiveButtonClickListener {
            viewModel.updateAlarmTime(alarmId, picker.hour, picker.minute)
        }

        picker.show(childFragmentManager, "time_picker")
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
} 