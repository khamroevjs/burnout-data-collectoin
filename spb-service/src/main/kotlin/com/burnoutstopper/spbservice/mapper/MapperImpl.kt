package com.burnoutstopper.spbservice.mapper

import com.burnoutstopper.spbservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.spbservice.model.Result
import org.springframework.stereotype.Component

@Component
class MapperImpl : Mapper {
    override fun toResultsResponseDTO(result: Result): ResultsResponseDTO {
        return ResultsResponseDTO(
                dateTime = result.dateTime,
                catastrophizing = result.catastrophizing,
                dutyToSelf = result.dutyToSelf,
                dutyToOthers = result.dutyToOthers,
                lowFrustrationTolerance = result.lowFrustrationTolerance,
                selfEsteem = result.selfEsteem
        )
    }

    override fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO {
        return ResultsIdResponseDTO(
                respondentId = result.respondentId,
                quizId = result.quizId,
                dateTime = result.dateTime,
                catastrophizing = result.catastrophizing,
                dutyToSelf = result.dutyToSelf,
                dutyToOthers = result.dutyToOthers,
                lowFrustrationTolerance = result.lowFrustrationTolerance,
                selfEsteem = result.selfEsteem
        )
    }
}
