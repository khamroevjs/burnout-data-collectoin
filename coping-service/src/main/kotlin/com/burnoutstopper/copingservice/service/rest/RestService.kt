package com.burnoutstopper.copingservice.service.rest

interface RestService {
    fun newRespondent(): String
    fun getRespondentId(token: String): Int
}
