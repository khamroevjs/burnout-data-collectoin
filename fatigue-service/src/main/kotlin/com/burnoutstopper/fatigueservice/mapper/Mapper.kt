package com.burnoutstopper.fatigueservice.mapper

import com.burnoutstopper.fatigueservice.dto.results.ResultsIdResponseDTO
import com.burnoutstopper.fatigueservice.dto.results.ResultsResponseDTO
import com.burnoutstopper.fatigueservice.model.Result

interface Mapper {
    
    fun toResultsResponseDTO(result: Result): ResultsResponseDTO
    fun toResultsIdResponseDTO(result: Result): ResultsIdResponseDTO
}
