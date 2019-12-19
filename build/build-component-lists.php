<?php

declare(strict_types=1);

const PROJECT_INFO = [
    'mezzio' => [
        'title' => 'Mezzio: PSR-15 Middleware in Minutes',
        'file' => 'data/component-list.mezzio.json',
    ],
];

const CARD_TEMPLATE = <<< 'END'
    <div class="col mb-4">
        <div class="card h-100">
            <div class="card-header bg-mezzio text-white">
                {package}
            </div>
            <div class="card-body">
                <h5 class="card-title"><a href="{url}">{name}</a></h5>
                <p class="card-text">{description}</p>
            </div>
        </div>
    </div>

END;

const DECK_TEMPLATE = <<< 'END'
<h3 class="text-mezzio">Mezzio: PSR-15 Middleware in Minutes</h3>
<div class="row row-cols-1 row-cols-md-3">
{packages}
</div>


END;

function preparePackage(array $package) : string
{
    $card = CARD_TEMPLATE;
    foreach ($package as $key => $value) {
        $search = sprintf('{%s}', $key);
        $card = str_replace($search, $value, $card);
    }
    return $card;
}

function prepareProject(array $project) : string
{
    $packages = array_map(function ($package) {
        return preparePackage($package);
    }, $project);

    return str_replace('{packages}', implode("\n", $packages), DECK_TEMPLATE);
}

function fetchProject(string $file) : array
{
    $contents = file_get_contents($file);
    return json_decode($contents, true);
}

function injectProjectContent(string $content, string $file) : void
{
    $homepage = file_get_contents($file);
    $replacement = preg_replace(
        '#(?<start>\<\!-- START COMPONENT LISTS --\>).*?(?<end>\<\!-- END COMPONENT LISTS --\>)#s',
        '$1' . $content . '$2',
        $homepage
    );
    file_put_contents($file, $replacement);
}

chdir(dirname(__DIR__));

$content = prepareProject(fetchProject('data/component-list.mezzio.json'));

injectProjectContent($content, './index.html');
