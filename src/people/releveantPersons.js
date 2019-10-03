import uniq from 'lodash.uniq';

function amelsContains(id, members){
    for(let i = 0; i < members.length; i++){
        if(members[i].person === id) return true;
    }
    return false;
}

function returnRelevantTeamMembers(currentEmployeeId, allTeams){
    let arrayWithDuplicats = []
    let arrayWithNoDuplicats = [];
    for(let i = 0; i < allTeams.length; i++){
        if(amelsContains(currentEmployeeId,allTeams[i].members)){
            arrayWithDuplicats.push(...allTeams[i].members);
        }
    }
    arrayWithNoDuplicats = uniq(arrayWithDuplicats);
    return arrayWithNoDuplicats;
}

export {returnRelevantTeamMembers, amelsContains}