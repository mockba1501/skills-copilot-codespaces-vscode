function skillsMembers() {
    let members = [
        { name: 'John', skills: ['JavaScript', 'React', 'Node'] },
        { name: 'Jane', skills: ['JavaScript', 'React', 'Node'] }
    ];
    let skills = members.map(member => member.skills);
    return skills;
}