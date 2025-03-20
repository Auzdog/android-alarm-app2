package com.example.alarmapp

import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import com.example.alarmapp.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

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

        // FAB click listener (we'll implement this later)
        binding.fab.setOnClickListener {
            // TODO: Implement FAB click action
        }

        // Set initial selection
        updateNavSelection(NavSection.ALARM)
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