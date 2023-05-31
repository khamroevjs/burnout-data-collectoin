package com.burnoutstopper.fatigueservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class ResultsResponseDTO(
        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,

        @JsonProperty("fatigue_index")
        val fatigueIndex: Int,

        @JsonProperty("physical_discomfort")
        val physicalDiscomfort: Int,

        @JsonProperty("cognitive_discomfort")
        val cognitiveDiscomfort: Int,

        @JsonProperty("emotional_violation")
        val emotionalViolation: Int,

        @JsonProperty("motivation_decrease")
        val motivationDecrease: Int,
)
