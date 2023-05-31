package com.burnoutstopper.copingservice.dto.mapper

import com.burnoutstopper.copingservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.copingservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.copingservice.model.Result

interface Mapper {
    fun toResultsResponseDTO(result: Result): ResultsResponseDTO
    fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO
}
