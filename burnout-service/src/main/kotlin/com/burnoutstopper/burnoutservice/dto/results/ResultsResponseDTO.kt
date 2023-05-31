package com.burnoutstopper.burnoutservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigDecimal
import java.time.OffsetDateTime

data class ResultsResponseDTO(
        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,

        @JsonProperty("exhaustion")
        val exhaustion: Int,

        @JsonProperty("depersonalization")
        val depersonalization: Int,

        @JsonProperty("reduction")
        val reduction: Int,

        @JsonProperty("integral_index")
        val integralIndex: BigDecimal)
