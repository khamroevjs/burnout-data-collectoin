package com.burnoutstopper.fatigueservice.dto.page

import com.fasterxml.jackson.annotation.JsonProperty

data class PageDTO<T>(
        @JsonProperty("total")
        val total: Long,
        
        @JsonProperty("page")
        val page: Int,
        
        @JsonProperty("size")
        val size: Int,
        
        @JsonProperty("data")
        val data: List<T>
)
