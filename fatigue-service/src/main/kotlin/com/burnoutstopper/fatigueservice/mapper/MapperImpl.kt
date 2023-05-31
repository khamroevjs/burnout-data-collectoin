package com.burnoutstopper.fatigueservice.mapper

import com.burnoutstopper.fatigueservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.fatigueservice.model.Result
import org.springframework.stereotype.Component

@Component
class MapperImpl : Mapper {
    override fun toResultsResponseDTO(result: Result): ResultsResponseDTO {
        return ResultsResponseDTO(
                dateTime = result.dateTime,
                fatigueIndex = result.fatigueIndex,
                physicalDiscomfort = result.physicalDiscomfort,
                cognitiveDiscomfort = result.cognitiveDiscomfort,
                emotionalViolation = result.emotionalViolation,
                motivationDecrease = result.motivationDecrease
        )
    }

    override fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO {
        return ResultsIdResponseDTO(
                respondentId = result.respondentId,
                quizId = result.quizId,
                dateTime = result.dateTime,
                fatigueIndex = result.fatigueIndex,
                physicalDiscomfort = result.physicalDiscomfort,
                cognitiveDiscomfort = result.cognitiveDiscomfort,
                emotionalViolation = result.emotionalViolation,
                motivationDecrease = result.motivationDecrease
        )
    }
}
