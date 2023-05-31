package com.burnoutstopper.burnoutservice.mapper

import com.burnoutstopper.burnoutservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.burnoutservice.model.Result
import org.springframework.stereotype.Component

@Component
class MapperImpl : Mapper {

    override fun toResultsResponseDTO(result: Result): ResultsResponseDTO {
        return ResultsResponseDTO(
                dateTime = result.dateTime,
                exhaustion = result.exhaustion,
                depersonalization = result.depersonalization,
                reduction = result.reduction,
                integralIndex = result.integralIndex
        )
    }

    override fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO {
        return ResultsIdResponseDTO(
                respondentId = result.respondentId,
                dateTime = result.dateTime,
                exhaustion = result.exhaustion,
                depersonalization = result.depersonalization,
                reduction = result.reduction,
                integralIndex = result.integralIndex,
                quizId = result.quizId
        )
    }
}
