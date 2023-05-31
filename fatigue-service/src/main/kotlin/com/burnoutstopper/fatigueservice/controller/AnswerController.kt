package com.burnoutstopper.fatigueservice.controller

import com.burnoutstopper.fatigueservice.dto.answers.AnswersRequestDTO
import com.burnoutstopper.fatigueservice.dto.answers.AnswersResponseDTO
import com.burnoutstopper.fatigueservice.service.result.ResultService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/fatigue/v1/answers")
class AnswerController @Autowired constructor(private val resultService: ResultService) {

    private val log = LoggerFactory.getLogger(RestController::class.java)

    @PostMapping
    fun postAnswer(@RequestBody answersRequestDTO: AnswersRequestDTO): AnswersResponseDTO {
        log.info(answersRequestDTO.toString())
        val response = resultService.saveResult(answersRequestDTO)
        log.info(response.toString())
        return response
    }
}
