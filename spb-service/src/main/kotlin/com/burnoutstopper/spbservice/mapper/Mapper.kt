package com.burnoutstopper.spbservice.mapper

import com.burnoutstopper.spbservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.spbservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.spbservice.model.Result

interface Mapper {
    fun toResultsResponseDTO(result: Result): ResultsResponseDTO
    fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO
}
