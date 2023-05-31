CREATE TABLE IF NOT EXISTS results
(
    id                BIGSERIAL PRIMARY KEY,
    respondent_id     INT                      NOT NULL,
    quiz_id           INT,
    date_time         TIMESTAMP WITH TIME ZONE NOT NULL,
    exhaustion        INT                      NOT NULL,
    depersonalization INT                      NOT NULL,
    reduction         INT                      NOT NULL,
    integral_index    DECIMAL(3, 2)            NOT NULL,
    answers           VARCHAR                  NOT NULL
);
