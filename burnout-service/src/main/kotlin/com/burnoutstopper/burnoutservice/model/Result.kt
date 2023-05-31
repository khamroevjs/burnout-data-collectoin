package com.burnoutstopper.burnoutservice.model

import jakarta.persistence.*
import java.math.BigDecimal
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

        @Column(name = "exhaustion")
        val exhaustion: Int,

        @Column(name = "depersonalization")
        val depersonalization: Int,

        @Column(name = "reduction")
        val reduction: Int,
        
        @Column(name = "integral_index")
        val integralIndex: BigDecimal,

        @Column(name = "answers")
        val answers: String,
)
