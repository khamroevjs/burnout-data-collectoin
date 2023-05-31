package com.burnoutstopper.burnoutservice.service.rest

interface RestService {
    fun newRespondent(): String
    fun getRespondentId(token: String): Int
}
