package com.burnoutstopper.copingservice.dto.answers

import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO
import com.fasterxml.jackson.annotation.JsonProperty

data class AnswersResponseDTO(
        @JsonProperty("token")
        val token: String,
        
        @JsonProperty("result")
        val result: ResultsResponseDTO
)
