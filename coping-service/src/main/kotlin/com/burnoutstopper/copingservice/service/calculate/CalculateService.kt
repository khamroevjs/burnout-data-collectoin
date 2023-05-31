package com.burnoutstopper.copingservice.service.calculate

import com.burnoutstopper.copingservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.copingservice.model.Result

interface CalculateService {
    fun calculateResult(answersRequestDTO: AnswersRequestDTO, respondentId: Int): Result
}
