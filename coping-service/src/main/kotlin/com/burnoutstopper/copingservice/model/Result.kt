package com.burnoutstopper.copingservice.model

import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
@Table(name = "results")
data class Result(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        var id: Long = 0,

        @Column(name = "respondent_id")
        val respondentId: Int,

        @Column(name = "quiz_id")
        val quizId: Int?,

        @Column(name = "date_time")
        val dateTime: OffsetDateTime,


        @Column(name = "confrontation")
        val confrontation: Int,

        @Column(name = "distancing")
        val distancing: Int,

        @Column(name = "self_control")
        val selfControl: Int,

        @Column(name = "seeking_social_support")
        val seekingSocialSupport: Int,

        @Column(name = "taking_responsibility")
        val takingResponsibility: Int,

        @Column(name = "escape_avoidance")
        val escapeAvoidance: Int,

        @Column(name = "problem_solving_planning")
        val problemSolvingPlanning: Int,

        @Column(name = "positive_reassessment")
        val positiveReassessment: Int,


        @Column(name = "confrontation_tpoint")
        val confrontationTPoint: Int,

        @Column(name = "distancing_tpoint")
        val distancingTPoint: Int,

        @Column(name = "self_control_tpoint")
        val selfControlTPoint: Int,

        @Column(name = "seeking_social_support_tpoint")
        val seekingSocialSupportTPoint: Int,

        @Column(name = "taking_responsibility_tpoint")
        val takingResponsibilityTPoint: Int,

        @Column(name = "escape_avoidance_tpoint")
        val escapeAvoidanceTPoint: Int,

        @Column(name = "problem_solving_planning_tpoint")
        val problemSolvingPlanningTPoint: Int,

        @Column(name = "positive_reassessment_tpoint")
        val positiveReassessmentTPoint: Int,
        
        @Column(name = "answers")
        val answers: String,
)
