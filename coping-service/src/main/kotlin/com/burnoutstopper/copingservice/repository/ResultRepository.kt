package com.burnoutstopper.copingservice.repository

import com.burnoutstopper.copingservice.model.Result
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.jpa.repository.JpaRepository


interface ResultRepository : JpaRepository<Result, Long> {
    fun findAllByRespondentId(id: Int, pageRequest: PageRequest): Page<Result>
    fun findAllByQuizIdAndRespondentId(quizId: Int, respondentId: Int): List<Result>
    fun findAllByQuizId(quizId: Int): List<Result>
    fun existsByQuizIdAndRespondentId(quizId: Int, respondentId: Int): Boolean
    fun existsByQuizId(quizId: Int): Boolean
}
