package com.burnoutstopper.burnoutservice.dto.answers

import com.fasterxml.jackson.annotation.JsonProperty

data class AnswersRequestDTO(
    @JsonProperty("token")
    val token: String = "",

    @JsonProperty("quiz_id")
    val quizId: Int?,

    @JsonProperty("answers")
    val answers: List<Int>
)
