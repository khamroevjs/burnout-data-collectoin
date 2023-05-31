package com.burnoutstopper.burnoutservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigDecimal
import java.time.OffsetDateTime

data class ResultsIdResponseDTO(
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
        val integralIndex: BigDecimal
) {
    val burnoutScore: Int
        @JsonProperty("burnout_score")
        get() = exhaustion + depersonalization + reduction
    val burnoutIndex: Int
        @JsonProperty("burnout_index")
        get() = reduction + depersonalization + 48 - reduction
}
