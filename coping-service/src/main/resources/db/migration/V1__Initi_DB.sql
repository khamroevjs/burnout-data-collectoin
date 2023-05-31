CREATE TABLE IF NOT EXISTS results
(
    id                              BIGSERIAL PRIMARY KEY,
    respondent_id                   INT                      NOT NULL,
    quiz_id                         INT,
    date_time                       TIMESTAMP WITH TIME ZONE NOT NULL,

    confrontation                   INT                      NOT NULL,
    distancing                      INT                      NOT NULL,
    self_control                    INT                      NOT NULL,
    seeking_social_support          INT                      NOT NULL,
    taking_responsibility           INT                      NOT NULL,
    escape_avoidance                INT                      NOT NULL,
    problem_solving_planning        INT                      NOT NULL,
    positive_reassessment           INT                      NOT NULL,

    confrontation_tpoint            INT                      NOT NULL,
    distancing_tpoint               INT                      NOT NULL,
    self_control_tpoint             INT                      NOT NULL,
    seeking_social_support_tpoint   INT                      NOT NULL,
    taking_responsibility_tpoint    INT                      NOT NULL,
    escape_avoidance_tpoint         INT                      NOT NULL,
    problem_solving_planning_tpoint INT                      NOT NULL,
    positive_reassessment_tpoint    INT                      NOT NULL,
    answers                         VARCHAR                  NOT NULL
);
