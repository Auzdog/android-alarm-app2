package com.example.alarmapp

data class Alarm(
    val id: Long,
    val hour: Int,
    val minute: Int,
    val label: String = "",
    val isEnabled: Boolean = true
) 