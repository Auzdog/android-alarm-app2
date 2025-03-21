package com.example.alarmapp

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class AlarmViewModel : ViewModel() {
    private val _alarms = MutableLiveData<List<Alarm>>()
    val alarms: LiveData<List<Alarm>> = _alarms

    init {
        // Start with an empty list
        _alarms.value = emptyList()
    }

    fun addAlarm(hour: Int, minute: Int, label: String = "") {
        val currentAlarms = _alarms.value.orEmpty().toMutableList()
        val newId = (currentAlarms.maxOfOrNull { it.id } ?: 0) + 1
        val newAlarm = Alarm(newId, hour, minute, label)
        currentAlarms.add(newAlarm)
        _alarms.value = currentAlarms
    }

    fun deleteAlarm(id: Long) {
        val currentAlarms = _alarms.value.orEmpty().toMutableList()
        currentAlarms.removeAll { it.id == id }
        _alarms.value = currentAlarms
    }

    fun toggleAlarm(id: Long, isEnabled: Boolean) {
        val currentAlarms = _alarms.value.orEmpty().toMutableList()
        val index = currentAlarms.indexOfFirst { it.id == id }
        if (index != -1) {
            currentAlarms[index] = currentAlarms[index].copy(isEnabled = isEnabled)
            _alarms.value = currentAlarms
        }
    }

    fun updateAlarmTime(id: Long, hour: Int, minute: Int) {
        val currentAlarms = _alarms.value.orEmpty().toMutableList()
        val index = currentAlarms.indexOfFirst { it.id == id }
        if (index != -1) {
            currentAlarms[index] = currentAlarms[index].copy(hour = hour, minute = minute)
            _alarms.value = currentAlarms
        }
    }
} 