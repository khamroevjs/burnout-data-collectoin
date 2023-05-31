package com.burnoutstopper.spbservice.model

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
        
        @Column(name = "catastrophizing")
        val catastrophizing: Int,
        
        @Column(name = "duty_to_self")
        val dutyToSelf: Int,
        
        @Column(name = "duty_to_others")
        val dutyToOthers: Int,
        
        @Column(name = "low_frustration_tolerance")
        val lowFrustrationTolerance: Int,
        
        @Column(name = "self_esteem")
        val selfEsteem: Int,
        
        @Column(name = "answers")
        val answers: String
)
