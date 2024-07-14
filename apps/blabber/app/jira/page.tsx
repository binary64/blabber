'use client';

import { invoke } from '@tauri-apps/api';
import Card from './_components/Card';

const branchName = 'rev_prisma';

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4">
        <h1 className="font-bold text-3xl self-center">Tasks</h1>
        <a className="btn btn-primary">New task</a>
      </div>
      {/* list tasks */}
      <div className="w-full grid grid-cols-1 gap-4 p-8">
        {/* <Card
          title={
            <>
              Resolve comments on your PR <pre>{branchName}</pre>
            </>
          }
          buttons={{
            'Start Review': 'primary',
          }}
        >
          You have 2 outstanding comments on your PR 😲
        </Card>
        <Card
          title={
            <>
              Review teammates PR <pre>{branchName}</pre>
            </>
          }
          buttons={{
            'Start Review': 'primary',
          }}
        >
          Your teammates PR is green and ready for review 🚀
        </Card>
        <Card
          title={
            <>
              Publish your local branch <pre>{branchName}</pre>
            </>
          }
          buttons={{
            'Create Jira & PR': 'primary',
            'PR Only': 'ghost',
          }}
        >
          11 files changed in projects
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            web
          </span>
          and
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            atlas
          </span>
        </Card>
        <Card
          title={
            <>
              Fix merge conflict on <pre>{branchName}</pre>
            </>
          }
          buttons={{
            'Resolve now': 'primary',
            'Auto rebase': 'ghost',
          }}
        >
          Your PR is conflicted on{' '}
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            yarn.lock
          </span>
          ,{' '}
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            apps/web/components/Blah/Blah.tsx
          </span>
          , and 3 other files.
        </Card>
        <Card
          title={
            <>
              Fix red pipeline for <pre>{branchName}</pre>
            </>
          }
          buttons={{
            'Open in IDE': 'primary',
            'Open pipeline': 'ghost',
          }}
        >
          Your PR has failed on{' '}
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            tsc checks
          </span>
          and
          <span className="font-bold font-mono text-lg bg-lime-100 p-1 m-1">
            lint checks
          </span>
        </Card> */}
        <Card
          title={
            <>
              Review a PR <pre>{branchName}</pre>
            </>
          }
          buttons={[
            ['Start Review', 'primary', () => {}],
            [
              'Open in IDE',
              'ghost',
              async () => {
                // open code using rust backend
                const result = await invoke<void>('open_code', {
                  branchName,
                });
                console.log('Result', result);
              },
            ],
          ]}
        >
          Your daily dose of code review 🚀
        </Card>
        {/* <Card
          title={<>Create new branch for In-Progress Jira</>}
          buttons={{
            'Open in IDE': 'primary',
            'Open Jira': 'ghost',
          }}
        >
          Start work on your ticket.
        </Card>
        <Card
          title={<>Start a To-Do Jira</>}
          buttons={{
            'Open in IDE': 'primary',
            'Open Jira': 'ghost',
          }}
        >
          Start work on your next ticket.
        </Card> */}
      </div>
    </div>
  );
};

export default Page;
