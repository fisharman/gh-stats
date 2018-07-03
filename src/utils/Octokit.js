import Octokit from '@octokit/rest';

const setupOctokit = () => {
    const octokit = new Octokit({debug: true});
    octokit.authenticate({
        type: 'token',
        token: '6c2813cd92c364edb8a2653d7c39a02bd9952daf'
    });
    return octokit;
}

export const octokit = setupOctokit()