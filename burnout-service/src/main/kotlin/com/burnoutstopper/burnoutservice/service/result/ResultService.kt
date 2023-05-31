package com.burnoutstopper.burnoutservice.service.result

import com.burnoutstopper.burnoutservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.burnoutservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.burnoutservice.dto.page.PageDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsResponseDTO


interface ResultService {
    fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO
    fun getResultsByToken(token: String, page: Int, size: Int): PageDTO<ResultsResponseDTO>
    fun getResultById(id: Long): ResultsIdResponseDTO
    fun getByQuizAndRespondent(quizId: Int, respondentId: Int?): List<ResultsIdResponseDTO>
    fun existsByQuizAndRespondent(quizId: Int, respondentId: Int?): Boolean
}
