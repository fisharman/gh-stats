import { octokit } from './Octokit'

const MAX_ATTEMPT = 3;
const RETRY_DELAY = 500;
const wait = ms => new Promise(resolve => setTimeout(resolve,ms));

const getUserRepo = async (owner, repo) => {
    const result = await octokit.repos.get({owner: owner, repo: repo});
    return result;
}

const getStatsCommitActivity = async (owner, repo) => {
    let result;
    for (let attempt = 0; attempt < MAX_ATTEMPT; attempt++){
        result = await octokit.repos.getStatsCommitActivity({owner: owner, repo: repo});
        if (result.status === 202)
            await wait(RETRY_DELAY);
        else
            break;
    }
    if (result.status === 202)
        throw new Error('API Still Processing')
    return result;
}

const getStatsCodeFrequency = async (owner, repo) => {
    let result;
    for (let attempt = 0; attempt < MAX_ATTEMPT; attempt++){
        result = await octokit.repos.getStatsCodeFrequency({owner: owner, repo: repo});
        if (result.status === 202)
            await wait(RETRY_DELAY);
        else
            break;
    }
    if (result.status === 202)
        throw new Error('API Still Processing')
    return result;
}

const getStatsPunchCard = async (owner, repo) => {
    let result;
    for (let attempt = 0; attempt < MAX_ATTEMPT; attempt++){
        result = await octokit.repos.getStatsPunchCard({owner: owner, repo: repo});
        if (result.status === 202)
            await wait(RETRY_DELAY);
        else
            break;
    }
    if (result.status === 202)
        throw new Error('API Still Processing')
    return result;
}

export default {
    getUserRepo,
    getStatsCommitActivity,
    getStatsCodeFrequency,
    getStatsPunchCard
}