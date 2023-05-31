package com.burnoutstopper.gatewayservice.dto.respondent

import com.fasterxml.jackson.annotation.JsonProperty

data class RespondentDTO(
        @JsonProperty("respondent_id")
        val respondentId: Int,

        @JsonProperty("token")
        val token: String
)
