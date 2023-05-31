package com.burnoutstopper.burnoutservice.mapper

import com.burnoutstopper.burnoutservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.burnoutservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.burnoutservice.model.Result

interface Mapper {
    fun toResultsResponseDTO(result: Result): ResultsResponseDTO
    fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO
}
