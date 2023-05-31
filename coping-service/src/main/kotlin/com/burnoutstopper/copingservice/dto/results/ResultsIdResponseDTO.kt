package com.burnoutstopper.copingservice.dto.results

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.OffsetDateTime

data class ResultsIdResponseDTO(
        @JsonProperty("respondent_id")
        val respondentId: Int,

        @JsonProperty("quiz_id")
        val quizId: Int?,

        @JsonProperty("date_time")
        val dateTime: OffsetDateTime,
        

        @JsonProperty("confrontation")
        val confrontation: Int,

        @JsonProperty("distancing")
        val distancing: Int,

        @JsonProperty("self_control")
        val selfControl: Int,

        @JsonProperty("seeking_social_support")
        val seekingSocialSupport: Int,

        @JsonProperty("taking_responsibility")
        val takingResponsibility: Int,

        @JsonProperty("escape_avoidance")
        val escapeAvoidance: Int,

        @JsonProperty("problem_solving_planning")
        val problemSolvingPlanning: Int,

        @JsonProperty("positive_reassessment")
        val positiveReassessment: Int,


        @JsonProperty("confrontation_tpoint")
        val confrontationTPoint: Int,

        @JsonProperty("distancing_tpoint")
        val distancingTPoint: Int,

        @JsonProperty("self_control_tpoint")
        val selfControlTPoint: Int,

        @JsonProperty("seeking_social_support_tpoint")
        val seekingSocialSupportTPoint: Int,

        @JsonProperty("taking_responsibility_tpoint")
        val takingResponsibilityTPoint: Int,

        @JsonProperty("escape_avoidance_tpoint")
        val escapeAvoidanceTPoint: Int,

        @JsonProperty("problem_solving_planning_tpoint")
        val problemSolvingPlanningTPoint: Int,

        @JsonProperty("positive_reassessment_tpoint")
        val positiveReassessmentTPoint: Int
)
