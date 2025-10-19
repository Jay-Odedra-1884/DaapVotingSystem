// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract VotingSystem {
    struct Topic {
        uint id;
        string title;
        address owner;
        uint[] voteCount;
        string[] options;
        bool exists;
        mapping(address => bool) voted;
    }

    address immutable owner;
    uint public id = 0;
    mapping(uint => Topic) public topics;

    // Events
    event TopicCreated(uint indexed id, string title, address indexed owner);
    event TopicDeleted(uint indexed id, address indexed owner);
    event TitleEdited(uint indexed id, string newTitle);
    event OptionAdded(uint indexed id, string option);
    event OptionEdited(uint indexed id, uint indexed index, string newOption);
    event OptionDeleted(uint indexed id, uint indexed index);
    event Voted(uint indexed id, uint indexed optionIndex, address indexed voter);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyowner {
        require(msg.sender == owner, "You are not the owner of this topic");
        _;
    }

    // Create topic
    function createTopic(string memory _title, string[] memory _options) public {
        require(_options.length >= 2, "At least two option needed");
        Topic storage t = topics[id];
        t.id = id;
        t.title = _title;
        t.owner = msg.sender;
        t.voteCount = new uint[](_options.length);
        t.options = _options;
        t.exists = true;

        emit TopicCreated(id, _title, msg.sender);

        id++;
    }

    // Get topic by ID
    function getTopicById(uint _id) public view returns (uint, string memory, address, string[] memory, uint[] memory) {
        require(_id < id, "Invalid Id");
        Topic storage t = topics[_id];
        require(t.exists, "Topic not found");
        return (t.id, t.title, t.owner, t.options, t.voteCount);
    }

    // Vote
    function vote(uint _id, uint _index) public {
        require(_id < id, "Invalid Id");
        Topic storage t = topics[_id];
        require(t.exists, "Topic not found");
        require(_index < t.options.length, "Invalid option");
        require(!t.voted[msg.sender], "Voted once");

        t.voted[msg.sender] = true;
        t.voteCount[_index]++;

        emit Voted(_id, _index, msg.sender);
    }

    // Edit title
    function editTitle(uint _id, string memory _newTitle) public {
        require(_id < id, "Invalid Id");
        require(topics[_id].exists, "Topic not found");

        topics[_id].title = _newTitle;

        emit TitleEdited(_id, _newTitle);
    }

    // Delete topic
    function deleteTopic(uint _id) public {
        require(_id < id, "Invalid Id");
        require(topics[_id].exists, "Topic not found");
        require(msg.sender == topics[_id].owner, "Only owner can delete topic");

        delete topics[_id];

        emit TopicDeleted(_id, msg.sender);
    }

    // Add option
    function addOption(uint _id, string memory _newOption) public {
        require(_id < id, "Invalid Id");
        require(topics[_id].exists, "Topic not found");

        topics[_id].options.push(_newOption);
        topics[_id].voteCount.push(0);

        emit OptionAdded(_id, _newOption);
    }

    // Edit option
    function editOption(uint _id, uint _index, string memory _newOptionText) public {
        require(_id < id, "Invalid Id");
        require(topics[_id].exists, "Topic not found");
        require(_index < topics[_id].options.length, "Invalid option");

        topics[_id].options[_index] = _newOptionText;

        emit OptionEdited(_id, _index, _newOptionText);
    }

    // Delete option
    function deleteOption(uint _id, uint _index) public {
        require(_id < id, "Invalid Id");
        require(topics[_id].exists, "Topic not found");

        Topic storage t = topics[_id];

        for (uint i = _index; i < t.options.length - 1; i++) {
            t.options[i] = t.options[i + 1];
            t.voteCount[i] = t.voteCount[i + 1];
        }

        t.options.pop();
        t.voteCount.pop();

        emit OptionDeleted(_id, _index);
    }
}
