package com.burnoutstopper.burnoutservice.dto.answers

import com.burnoutstopper.burnoutservice.dto.results.ResultsResponseDTO
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class AnswersResponseDTO(
    @JsonProperty("token")
    val token: String,
    
    @JsonProperty("result")
    val result: ResultsResponseDTO
)
