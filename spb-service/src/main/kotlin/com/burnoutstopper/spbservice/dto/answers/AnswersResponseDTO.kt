package com.burnoutstopper.spbservice.dto.answers

import com.burnoutstopper.spbservice.dto.results.ResultsResponseDTO
import com.fasterxml.jackson.annotation.JsonProperty

data class AnswersResponseDTO(
        @JsonProperty("token")
        val token: String,
        
        @JsonProperty("result")
        val result: ResultsResponseDTO
)
