package com.burnoutstopper.spbservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class ResultsResponseDTO(
        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,
        
        @JsonProperty("catastrophizing")
        val catastrophizing: Int,
        
        @JsonProperty("duty_to_self")
        val dutyToSelf: Int,
        
        @JsonProperty("duty_to_others")
        val dutyToOthers: Int,
        
        @JsonProperty("low_frustration_tolerance")
        val lowFrustrationTolerance: Int,
        
        @JsonProperty("self_esteem")
        val selfEsteem: Int
)
