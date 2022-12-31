pragma solidity ^0.8.7;
//THUBA DAO版权所有，盗用必究
contract Notes {
    struct note {
        uint256 id;
        string title;
        string content;
    }

    mapping(address => note[]) addr_to_notes;

    function addNote(string memory title, string memory content) public {
        uint256 newID = addr_to_notes[msg.sender].length;
        addr_to_notes[msg.sender].push(note(newID, title, content));
    }

    function getNotes() public view returns (note[] memory) {
        return addr_to_notes[msg.sender];
    }

    function removeNote(uint256 id) public {
        uint256 index = 0;
        for (uint256 i = 0; i < addr_to_notes[msg.sender].length; i++) {
            if (addr_to_notes[msg.sender][i].id == id) {
                index = i;
                break;
            }
        }

        for (uint256 i = index; i < addr_to_notes[msg.sender].length - 1; i++) {
            addr_to_notes[msg.sender][i] = addr_to_notes[msg.sender][i + 1];
        }
        delete addr_to_notes[msg.sender][addr_to_notes[msg.sender].length - 1];
        addr_to_notes[msg.sender].pop();
    }
}