package com.burnoutstopper.fatigueservice.model

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
        
        @Column(name = "fatigue_index")
        val fatigueIndex: Int,
        
        @Column(name = "physical_discomfort")
        val physicalDiscomfort: Int,
        
        @Column(name = "cognitive_discomfort")
        val cognitiveDiscomfort: Int,
        
        @Column(name = "emotional_violation")
        val emotionalViolation: Int,
        
        @Column(name = "motivation_decrease")
        val motivationDecrease: Int,
        
        @Column(name = "answers")
        val answers: String
)
