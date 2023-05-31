package com.burnoutstopper.copingservice.dto.mapper

import com.burnoutstopper.copingservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.copingservice.model.Result
import org.springframework.stereotype.Component

@Component
class MapperImpl : Mapper {

    override fun toResultsResponseDTO(result: Result): ResultsResponseDTO {
        return ResultsResponseDTO(
                dateTime = result.dateTime,
                confrontation = result.confrontation,
                distancing = result.distancing,
                selfControl = result.selfControl,
                seekingSocialSupport = result.seekingSocialSupport,
                takingResponsibility = result.takingResponsibility,
                escapeAvoidance = result.escapeAvoidance,
                problemSolvingPlanning = result.problemSolvingPlanning,
                positiveReassessment = result.positiveReassessment,
                confrontationTPoint = result.confrontationTPoint,
                distancingTPoint = result.distancingTPoint,
                selfControlTPoint = result.selfControlTPoint,
                seekingSocialSupportTPoint = result.seekingSocialSupportTPoint,
                takingResponsibilityTPoint = result.takingResponsibilityTPoint,
                escapeAvoidanceTPoint = result.escapeAvoidanceTPoint,
                problemSolvingPlanningTPoint = result.problemSolvingPlanningTPoint,
                positiveReassessmentTPoint = result.positiveReassessmentTPoint
        )
    }

    override fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO {
        return ResultsIdResponseDTO(
                respondentId = result.respondentId,
                quizId = result.quizId,
                dateTime = result.dateTime,
                confrontation = result.confrontation,
                distancing = result.distancing,
                selfControl = result.selfControl,
                seekingSocialSupport = result.seekingSocialSupport,
                takingResponsibility = result.takingResponsibility,
                escapeAvoidance = result.escapeAvoidance,
                problemSolvingPlanning = result.problemSolvingPlanning,
                positiveReassessment = result.positiveReassessment,
                confrontationTPoint = result.confrontationTPoint,
                distancingTPoint = result.distancingTPoint,
                selfControlTPoint = result.selfControlTPoint,
                seekingSocialSupportTPoint = result.seekingSocialSupportTPoint,
                takingResponsibilityTPoint = result.takingResponsibilityTPoint,
                escapeAvoidanceTPoint = result.escapeAvoidanceTPoint,
                problemSolvingPlanningTPoint = result.problemSolvingPlanningTPoint,
                positiveReassessmentTPoint = result.positiveReassessmentTPoint
        )
    }
}
