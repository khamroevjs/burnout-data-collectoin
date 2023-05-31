package com.burnoutstopper.copingservice.service.result

import com.burnoutstopper.copingservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.copingservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.copingservice.dto.page.PageDTO
import com.burnoutstopper.copingservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO

interface ResultService {
    fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO
    fun getResultsByToken(token: String, page: Int, size: Int): PageDTO<ResultsResponseDTO>
    fun getResultById(id: Long): ResultsIdResponseDTO
    fun getByQuizAndRespondent(quizId: Int, respondentId: Int?): List<ResultsIdResponseDTO>
    fun existsByQuizAndRespondent(quizId: Int, respondentId: Int?): Boolean
}
