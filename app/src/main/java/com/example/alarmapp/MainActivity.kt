package com.example.alarmapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.viewpager2.widget.ViewPager2
import com.example.alarmapp.databinding.ActivityMainBinding
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupNavigation()
    }
    
    private fun setupNavigation() {
        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_alarm -> {
                    binding.viewPager.currentItem = 0
                    true
                }
                R.id.navigation_stopwatch -> {
                    binding.viewPager.currentItem = 1
                    true
                }
                R.id.navigation_timer -> {
                    binding.viewPager.currentItem = 2
                    true
                }
                R.id.navigation_settings -> {
                    binding.viewPager.currentItem = 3
                    true
                }
                else -> false
            }
        }
        
        binding.addAlarmButton.setOnClickListener {
            // TODO: Show add alarm dialog
        }
    }
} 