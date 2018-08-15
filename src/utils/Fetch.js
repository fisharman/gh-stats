import { octokit } from './Octokit';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `bearer 6c2813cd92c364edb8a2653d7c39a02bd9952daf`
    }
});

const MAX_ATTEMPT = 3;
const RETRY_DELAY = 500;
const wait = ms => new Promise(resolve => setTimeout(resolve,ms));

const getUserRepo = async (owner, repo) => {
    const result = await octokit.repos.get({owner: owner, repo: repo});
    return result;
}

const getUserRepo_gql = async (owner, repo) => {
    const result = await client.query({
        query: gql`
        query ($owner: String!, $repo: String!) {
            repository(owner:$owner, name:$repo){
              name
              nameWithOwner
              id
            }
        }
        `,
        variables: {
            'owner': owner,
            'repo': repo
        }
    })
    
    const result1 = await client.query({
        query: gql`
        query {
            repository(owner:"octocat", name:"Hello-World") {
              issues(last:20, states:CLOSED) {
                edges {
                  node {
                    title
                    url
                    labels(first:5) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
    })
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
    getUserRepo_gql,
    getStatsCommitActivity,
    getStatsCodeFrequency,
    getStatsPunchCard
}