package com.example.alarmapp

import android.content.DialogInterface
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.ImageView
import android.widget.TextView
import android.widget.LinearLayout
import androidx.activity.viewModels
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import com.example.alarmapp.databinding.ActivityMainBinding
import com.example.alarmapp.databinding.DialogTimePickerBinding
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.google.android.material.textfield.TextInputEditText
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.TimeFormat
import java.util.Calendar

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val viewModel: AlarmViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Get NavController
        val navHostFragment = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController

        // Setup navigation click listeners
        binding.alarmButton.setOnClickListener {
            navController.navigate(R.id.alarmFragment)
            updateNavSelection(NavSection.ALARM)
        }

        binding.stopwatchButton.setOnClickListener {
            navController.navigate(R.id.stopwatchFragment)
            updateNavSelection(NavSection.STOPWATCH)
        }

        binding.timerButton.setOnClickListener {
            navController.navigate(R.id.timerFragment)
            updateNavSelection(NavSection.TIMER)
        }

        binding.settingsButton.setOnClickListener {
            navController.navigate(R.id.settingsFragment)
            updateNavSelection(NavSection.SETTINGS)
        }

        // FAB click listener
        binding.fab.setOnClickListener {
            showTimePicker()
        }

        // Set initial selection
        updateNavSelection(NavSection.ALARM)
    }

    private fun showTimePicker() {
        val calendar = Calendar.getInstance()
        val currentHour = calendar.get(Calendar.HOUR_OF_DAY)
        val currentMinute = calendar.get(Calendar.MINUTE)

        val picker = MaterialTimePicker.Builder()
            .setTimeFormat(TimeFormat.CLOCK_12H)
            .setHour(currentHour)
            .setMinute(currentMinute)
            .setTitleText("Set alarm time")
            .build()

        picker.addOnPositiveButtonClickListener {
            viewModel.addAlarm(picker.hour, picker.minute)
        }

        picker.show(supportFragmentManager, "time_picker")
    }

    private enum class NavSection {
        ALARM, STOPWATCH, TIMER, SETTINGS
    }

    private fun updateNavSelection(section: NavSection) {
        val orange = getColor(R.color.orange_500)
        val gray = getColor(R.color.gray_500)

        binding.alarmButton.findViewById<ImageView>(R.id.alarmIcon).setColorFilter(if (section == NavSection.ALARM) orange else gray)
        binding.alarmButton.findViewById<TextView>(R.id.alarmText).setTextColor(if (section == NavSection.ALARM) orange else gray)

        binding.stopwatchButton.findViewById<ImageView>(R.id.stopwatchIcon).setColorFilter(if (section == NavSection.STOPWATCH) orange else gray)
        binding.stopwatchButton.findViewById<TextView>(R.id.stopwatchText).setTextColor(if (section == NavSection.STOPWATCH) orange else gray)

        binding.timerButton.findViewById<ImageView>(R.id.timerIcon).setColorFilter(if (section == NavSection.TIMER) orange else gray)
        binding.timerButton.findViewById<TextView>(R.id.timerText).setTextColor(if (section == NavSection.TIMER) orange else gray)

        binding.settingsButton.findViewById<ImageView>(R.id.settingsIcon).setColorFilter(if (section == NavSection.SETTINGS) orange else gray)
        binding.settingsButton.findViewById<TextView>(R.id.settingsText).setTextColor(if (section == NavSection.SETTINGS) orange else gray)
    }
} 