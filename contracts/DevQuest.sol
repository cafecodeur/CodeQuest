// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CODEToken.sol";

contract DevQuest {
    enum QuestionType { Simple, Medium, Hard }

    struct Question {
        address asker;
        string text;
        QuestionType qType;
        bool answered;
    }

    struct Answer {
        address responder;
        string text;
        bool accepted;
    }

    CODEToken public codeToken;
    mapping(uint256 => Question) public questions;
    mapping(uint256 => Answer[]) public answers;
    uint256 public questionCount;

    mapping(address => uint256) public rewardsEarned;

    event QuestionPosted(uint256 indexed id, address indexed asker, string text, QuestionType qType);
    event AnswerPosted(uint256 indexed questionId, address indexed responder, string text);
    event AnswerAccepted(uint256 indexed questionId, uint256 indexed answerIndex, address indexed winner, uint256 reward);

    constructor(address _codeToken) {
        codeToken = CODEToken(_codeToken);
    }

    function postQuestion(string calldata text, QuestionType qType) external {
        questions[questionCount] = Question(msg.sender, text, qType, false);
        emit QuestionPosted(questionCount, msg.sender, text, qType);
        questionCount++;
    }

    function postAnswer(uint256 questionId, string calldata text) external {
        require(!questions[questionId].answered, "Already answered");
        answers[questionId].push(Answer(msg.sender, text, false));
        emit AnswerPosted(questionId, msg.sender, text);
    }

    function acceptAnswer(uint256 questionId, uint256 answerIndex) external {
        Question storage q = questions[questionId];
        require(msg.sender == q.asker, "Only asker can accept");
        require(!q.answered, "Already accepted");

        Answer storage a = answers[questionId][answerIndex];
        a.accepted = true;
        q.answered = true;

        uint256 rewardAmount = _getRewardAmount(q.qType);
        codeToken.mint(a.responder, rewardAmount);
        rewardsEarned[a.responder] += rewardAmount;

        emit AnswerAccepted(questionId, answerIndex, a.responder, rewardAmount);
    }

    function getAnswers(uint256 questionId) external view returns (Answer[] memory) {
        return answers[questionId];
    }

    function _getRewardAmount(QuestionType qType) internal pure returns (uint256) {
        if (qType == QuestionType.Simple) return 10 * 1e18;
        if (qType == QuestionType.Medium) return 50 * 1e18;
        return 100 * 1e18;
    }
}
