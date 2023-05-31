package com.burnoutstopper.fatigueservice.exception

import org.springframework.http.HttpStatus
import org.springframework.web.server.ResponseStatusException

class NoSuchElementFoundException(message: String?) : ResponseStatusException(HttpStatus.NOT_FOUND, message)
