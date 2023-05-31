package com.burnoutstopper.spbservice.service.rest

interface RestService {
    fun newRespondent(): String
    fun getRespondentId(token: String): Int
}
