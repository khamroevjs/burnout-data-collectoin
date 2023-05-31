package com.burnoutstopper.fatigueservice.service.result

import com.burnoutstopper.fatigueservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.fatigueservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.fatigueservice.dto.page.PageDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsResponseDTO

interface ResultService {
    fun saveResult(answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO
    fun getResultsByToken(token: String, page: Int, size: Int): PageDTO<ResultsResponseDTO>
    fun getResultById(id: Long): ResultsIdResponseDTO
    fun getByQuizAndRespondent(quizId: Int, respondentId: Int?): List<ResultsIdResponseDTO>
    fun existsByQuizAndRespondent(quizId: Int, respondentId: Int?): Boolean
}
