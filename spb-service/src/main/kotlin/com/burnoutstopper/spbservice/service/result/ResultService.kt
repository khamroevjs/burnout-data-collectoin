package com.burnoutstopper.spbservice.service.result

import com.burnoutstopper.burnoutservice.dto.page.PageDTO
import com.burnoutstopper.spbservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.spbservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsResponseDTO

interface ResultService {
    fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO
    fun getResultsByToken(token: String, page: Int, size: Int): PageDTO<ResultsResponseDTO>
    fun getResultById(id: Long): ResultsIdResponseDTO
    fun getByQuizAndRespondent(quizId: Int, respondentId: Int?): List<ResultsIdResponseDTO>
    fun existsByQuizAndRespondent(quizId: Int, respondentId: Int?): Boolean
}
