package com.burnoutstopper.gatewayservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty

data class ResultsByQuizDTO(
        @JsonProperty("test_1")
        var test1: List<ResultsBurnoutDTO>? = null,

        @JsonProperty("test_2")
        var test2: List<ResultsFatigueDTO>? = null,

        @JsonProperty("test_3")
        var test3: List<ResultsCopingDTO>? = null,

        @JsonProperty("test_4")
        var test4: List<ResultsSpbDTO>? = null,
) 
