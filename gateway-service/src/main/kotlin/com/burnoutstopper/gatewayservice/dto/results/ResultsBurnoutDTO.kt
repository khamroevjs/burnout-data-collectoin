package com.burnoutstopper.gatewayservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class ResultsBurnoutDTO(
        @JsonProperty("respondent_id")
        val respondentId: Int,

        @JsonProperty("quiz_id")
        val quizId: Int?,

        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,

        @JsonProperty("exhaustion")
        val exhaustion: Int,

        @JsonProperty("depersonalization")
        val depersonalization: Int,

        @JsonProperty("reduction")
        val reduction: Int,

        @JsonProperty("integral_index")
        val integralIndex: Double
) {
    val burnoutScore: Int
        @JsonProperty("burnout_score")
        get() = exhaustion + depersonalization + reduction
    val burnoutIndex: Int
        @JsonProperty("burnout_index")
        get() = reduction + depersonalization + 48 - reduction
}
